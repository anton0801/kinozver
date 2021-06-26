<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->string("role")->default("Гости");
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->text("about")->nullable();
            $table->text("user_social_id")->nullable();
            $table->string('avatarUrl')->nullable();
            $table->integer('last_visit')->default(time());
            $table->string('to_time_premium', 10)->nullable();
            $table->string('preferred_categories')->nullable();
            $table->boolean('is_banned')->default(0);
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
