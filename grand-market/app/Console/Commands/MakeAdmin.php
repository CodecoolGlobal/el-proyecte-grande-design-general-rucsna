<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;

class MakeAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:admin {email}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Give admin privileges to user';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');
        $user = User::where('email', $email)->firstOrFail();
        $user->is_admin = true;
        $user->save();

        $this->info("User {$email} is now an admin.");
    }
}
