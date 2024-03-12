<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;

class DeleteAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'delete:admin {email}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Remove admin privileges from user';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');
        $user = User::where('email', $email)->firstOrFail();
        $user->is_admin = false;
        $user->save();

        $this->info("User {$email} is no longer an admin.");
    }
}
