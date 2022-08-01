<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class User extends Model
{
    use HasFactory;
    public function validateUser(Request $request)
    {
        if ($request->isJson()) {
            $data = $request->json()->all();
            //hago la peticion a la base de datos
            $user = DB::table('users')->where('email', $data["email"])->first();
            //valido que el objeto que me devuelva no sea null
            if (is_object($user)) {
                //si se encontro el objeto del usuario validar contrasenia
                if ($user->password == $data["password"] ) {
                    return $user;
                } else {
                    return "Contrasenia erronea";
                }
            }
            return "Usuario no encontrado";
        }
    }
}
