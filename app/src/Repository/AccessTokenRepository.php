<?php

namespace App\Repository;

use App\Entity\AccessToken;
use App\Entity\User;
use DateTimeImmutable;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method AccessToken|null find($id, $lockMode = null, $lockVersion = null)
 * @method AccessToken|null findOneBy(array $criteria, array $orderBy = null)
 * @method AccessToken[]    findAll()
 * @method AccessToken[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AccessTokenRepository extends ServiceEntityRepository
{
    private $tokenTTL;

    public function __construct(ManagerRegistry $registry, string $tokenTTL)
    {
        $this->tokenTTL = $tokenTTL;

        parent::__construct($registry, AccessToken::class);
    }

    public function getTokenForUser(User $user)
    {
        return $this->findByUser($user) ?? $this->generateTokenForUser($user);
    }

    private function generateTokenForUser(User $user)
    {
        $this->cleanUpUserToken($user);

        $token = new AccessToken();
        $token->setUser($user);
        $token->setCreatedAt(new DateTimeImmutable("now"));
        $token->setToken($this->createTokenString($user));

        $this->_em->persist($token);
        $this->_em->flush();

        return $token;
    }

    private function createTokenString(User $user)
    {
        return sha1($user->getId().random_bytes(12));
    }

    private function cleanUpUserToken($user)
    {
        $this->createQueryBuilder('a')
            ->andWhere('a.user_id = :user_id')
            ->setParameter('user_id', $user->getId())
            ->delete();
    }

    private function findByUser(User $user): ?AccessToken
    {
        $expirationDate = new DateTimeImmutable("-{$this->tokenTTL} minutes");

        return $this->createQueryBuilder('a')
            ->andWhere('a.user_id = :user_id')
            ->andWhere('a.created_at < :created_at')
            ->setParameter('user_id', $user->getId())
            ->setParameter('created_at', $expirationDate)
            ->getQuery()
            ->getOneOrNullResult();
    }
}
