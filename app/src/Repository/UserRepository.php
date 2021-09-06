<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Exception;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository implements PasswordUpgraderInterface
{
    private $passwordHasher;
    private $validator;

    public function __construct(ManagerRegistry $registry, UserPasswordHasherInterface $passwordHasher, ValidatorInterface $validator)
    {
        $this->passwordHasher = $passwordHasher;
        $this->validator      = $validator;

        parent::__construct($registry, User::class);
    }

    /**
     * Used to upgrade (rehash) the user's password automatically over time.
     */
    public function upgradePassword(PasswordAuthenticatedUserInterface $user, string $newHashedPassword): void
    {
        if (!$user instanceof User) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', \get_class($user)));
        }

        $user->setPassword($newHashedPassword);
        $this->_em->persist($user);
        $this->_em->flush();
    }

    public function createUser(array $userData)
    {
        $user = new User();
        $user
            ->setUsername($userData['username'])
            ->setRawPassword($userData['password'])
            ->setPassword($this->passwordHasher->hashPassword(
                 $user,
                 $userData['password']
             ));

        $this->validateUser($user);

        try {
            $this->_em->persist($user);
            $this->_em->flush();
        } catch (Exception $e) {
            // We don't want to show actual SQL errors.
            throw new Exception('There was an error while creating your user');
        }
    }

    public function validateUser(User $user)
    {
        $errors = $this->validator->validate($user);

        if (count($errors) > 0) {
            $messages = [];
            foreach ($errors as $error) {
                $messages[] = $error->getMessage();
            }
            throw new Exception(implode('. ', $messages));
        }
    }
}
