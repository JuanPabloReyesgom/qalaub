<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class UserController extends Controller
{
    public function userValidate(Request $request)
    {
        $Objectuser = new User();
        $user = $Objectuser->validateUser($request);
        //valido que  la respuesta sea un usuario o no
        if (is_object($user)) {
            return response()->json($user);
        } else if ($user == 'Contrasenia erronea') {
            return response()->json("Contraseña erronea");
        } else {
            return response()->json("Usuario no encontrado");
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if ($request->isJson()) {
            $data = $request->json()->all();
            $validate = "Usuario creado con exito";
                try {
                    $result = DB::table('users')->insert([
                        'name' => $data["name"],
                        'email' => $data["email"],
                        'avatar'=>$data["avatar"],
                        'coment'=>$data["coment"],
                        'starts'=>$data["starts"]
                    ]);

                    if(!$result){
                        $validate="Hubo un error almacenando el usuario " + $data["name"];
                    }
                } catch (Exception $e) {
                    $validate = $e->getMessage();
                }

            return response()->json($validate);
        }
    }
    //Devolver todos los usuarios con sus comentarios y estrellas
    public function getUsers(){
        $fullUsers=User::all();
        return response()->json($fullUsers);
    }
}
