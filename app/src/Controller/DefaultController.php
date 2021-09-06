<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    /**
     * @Route("/", name="default")
     * @Route("/register", name="register", methods={"GET"})
     * @Route("/app", name="register", methods={"GET"})
     */
    public function indexAction()
    {
        return $this->render('index.html.twig');
    }
}
