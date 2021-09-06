<?php
namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class AppController extends AbstractController
{
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * @Route("/app/users", name="app_users_list", methods={"GET"})
     */
    public function users(): JsonResponse
    {
        $users = $this->userRepository->getUserList();

        return $this->json([ 'data' => $users ]);
    }
}
