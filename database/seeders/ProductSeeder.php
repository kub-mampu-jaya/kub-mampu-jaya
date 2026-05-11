<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Path to your products.sql file
        $sqlFilePath = 'products.sql';

        // Read the SQL file
        $sql = file_get_contents($sqlFilePath);
        
        // Execute the SQL queries
        DB::unprepared($sql);
    }
}
