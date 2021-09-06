<?php
namespace App\Controller;

use App\Repository\AccessTokenRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SecurityController extends AbstractController
{
    private $accessTokenRepository;
    private $userRepository;

    public function __construct(AccessTokenRepository $accessTokenRepository, UserRepository $userRepository)
    {
        $this->accessTokenRepository = $accessTokenRepository;
        $this->userRepository        = $userRepository;
    }

    /**
     * @Route("/login", name="login", methods={"POST"})
     */
    public function login(Request $request): JsonResponse
    {
        $user = $this->getUser();

        return $this->json(
            [ 'success' => true, ],
            200,
            [
                'X-AUTH-TOKEN' => $this->accessTokenRepository->getTokenForUser($user)->getToken(),
            ]
        );
    }

    /**
     * @Route("/sign-up", name="signup", methods={"POST"})
     */
    public function signup(Request $request): JsonResponse
    {
        try {
            $this->userRepository->createUser([
                'username' => $request->request->get('username'),
                'password' => $request->request->get('password'),
            ]);
        } catch (\Exception $e) {
            return $this->json([
                'success' => false,
                'error'   => $e->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }

        return $this->json([
            'success' => true
        ]);
    }
}
