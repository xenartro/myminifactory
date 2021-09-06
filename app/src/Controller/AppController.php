<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class AppController extends AbstractController
{
    /**
     * @Route("/app/users", name="app_users_list", methods={"GET"})
     */
    public function users(): JsonResponse
    {
        $user = $this->getUser();

        return $this->json([ 'data' => [] ]);
    }
}
