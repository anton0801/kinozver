<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\ExpectedNewMovies;
use App\Models\Movie;
use App\Models\User;
use Illuminate\Http\Request;

class ShowController extends Controller
{

    public function show($kp_id)
    {
        $movie = Movie::where("kinopoisk_id", $kp_id)->first();

        $comments = Comment::where("movie_id", $movie->id)->join("users", "comments.user_id", "=", "users.id")
            ->join("roles", "users.role_id", "=", "roles.id")
            ->orderBy("com_id", "desc")
            ->paginate(15);

        $similar_movies = $this->getMoviesByCategorySM(explode(",", $movie->genre)[0])
            ->where("id", "!=", $movie->id)
            ->get()
            ->take(16);

        return view("show_movie", compact("movie", "similar_movies", "comments"));
    }

    public function addComment(Request $request, $id)
    {
        $email = $request->email;
        $commentText = $request->comment;
        if (mb_strlen($email) == 0) {
            return redirect()->route("show.movie", $id)->withErrors("Введите ваш email");
        } else if (!$this->checkEmail($email)) {
            return redirect()->route("show.movie", $id)->withErrors("Введите корректный email");
        } else if (mb_strlen($commentText) == 0) {
            return redirect()->route("show.movie", $id)->withErrors("Введите ваш комментарий");
        } else {
            $comment = new Comment();
            $movie = Movie::where("kinopoisk_id", "=", $id)->first();
            $comment->user_id = User::where("email", "=", $email)->first()->id;
            $comment->comment_parent_id = null;
            $comment->movie_id = $movie->id;
            $comment->comment = $commentText;
            $comment->created_at = time();
            if ($comment->save()) {
                return redirect()->route("show.movie", $id)->with("success", "Вы удачно добавили комментарий");
            } else {
                return redirect()->route("show.movie", $id)->withErrors("Что-то пошло не так! Попробуйте еще раз");
            }
        }
    }

    public function editComment(Request $request, $comment_id)
    {

    }

    public function deleteComment($com_id)
    {
        $comment = Comment::find($com_id);
        if ($comment != null) {
            $movie = Movie::where("id", "=", $comment->movie_id)->first();
            if ($comment->delete()) {
                return redirect()->route("show.movie", $movie->kinopoisk_id)->with("success", "Вы удачно удалили комментарий");
            } else {
                return redirect()->route("show.movie", $movie->kinopoisk_id)->withErrors("Что-то пошло не так! Попробуйте еще раз");
            }
        }
        return redirect()->route("home")->withErrors("Что-то пошло не так! Попробуйте еще раз");
    }

    private function checkEmail($email)
    {
        if (preg_match("/^(?:[a-z0-9]+(?:[-_.]?[a-z0-9]+)?@[a-z0-9_.-]+(?:\.?[a-z0-9]+)?\.[a-z]{2,5})$/i", $email)) {
            return true;
        }
        return false;
    }

}
