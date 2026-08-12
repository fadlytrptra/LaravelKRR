<?php

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

return [

    /*
    |--------------------------------------------------------------------------
    | Default Database Connection Name
    |--------------------------------------------------------------------------
    |
    | Here you may specify which of the database connections below you wish
    | to use as your default connection for all database work. Of course
    | you may use many connections at once using the Database library.
    |
    */

    'default' => env('DB_CONNECTION', 'mysql'),

    /*
    |--------------------------------------------------------------------------
    | Database Connections
    |--------------------------------------------------------------------------
    |
    | Here are each of the database connections setup for your application.
    | Of course, examples of configuring each database platform that is
    | supported by Laravel is shown below to make development simple.
    |
    |
    | All database work in Laravel is done through the PHP PDO facilities
    | so make sure you have the driver for your particular database of
    | choice installed on your machine before you begin development.
    |
    */

    'connections' => [

        'sqlite' => [
            'driver' => 'sqlite',
            'url' => env('DATABASE_URL'),
            'database' => env('DB_DATABASE', database_path('database.sqlite')),
            'prefix' => '',
            'foreign_key_constraints' => env('DB_FOREIGN_KEYS', true),
        ],

        'mysql' => [
            'driver' => 'mysql',
            'url' => env('DATABASE_URL'),
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '3306'),
            'database' => env('DB_DATABASE', 'forge'),
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => true,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],

        'pgsql' => [
            'driver' => 'pgsql',
            'url' => env('DATABASE_URL'),
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '5432'),
            'database' => env('DB_DATABASE', 'forge'),
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'charset' => 'utf8',
            'prefix' => '',
            'prefix_indexes' => true,
            'search_path' => 'public',
            'sslmode' => 'prefer',
        ],

        'ConnPurchase' => [
            'driver' => 'sqlsrv',
            'url' => env('DATABASE_URL'),
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '1433'),
            'database' => env('DB_DATABASE', 'forge'),
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'charset' => 'utf8',
            'prefix' => '',
            'prefix_indexes' => true,
            'encrypt' => 'yes',
            'trust_server_certificate' => true,
        ],

        'ConnEDP' => [
            'driver' => 'sqlsrv',
            'url' => env('DATABASE_URL'),
            'host' => env('DB_HOST_FIRST', '127.0.0.1'),
            'port' => env('DB_PORT_FIRST', '1433'),
            'database' => env('DB_DATABASE_FIRST', 'forge'),
            'username' => env('DB_USERNAME_FIRST', 'forge'),
            'password' => env('DB_PASSWORD_FIRST', ''),
            'charset' => 'utf8',
            'prefix' => '',
            'prefix_indexes' => true,
            'encrypt' => 'yes',
            'trust_server_certificate' => true,
        ],

        'ConnSales' => [
            'driver' => 'sqlsrv',
            'url' => env('DATABASE_URL'),
            'host' => env('DB_HOST_SECOND', '127.0.0.1'),
            'port' => env('DB_PORT_SECOND', '1433'),
            'database' => env('DB_DATABASE_SECOND', 'forge'),
            'username' => env('DB_USERNAME_SECOND', 'forge'),
            'password' => env('DB_PASSWORD_SECOND', ''),
            'charset' => 'utf8',
            'prefix' => '',
            'prefix_indexes' => true,
            'encrypt' => 'yes',
            'trust_server_certificate' => true,
        ],

        'ConnInventory' => [
            'driver' => 'sqlsrv',
            'url' => env('DATABASE_URL'),
            'host' => env('DB_HOST_THIRD', '127.0.0.1'),
            'port' => env('DB_PORT_THIRD', '1433'),
            'database' => env('DB_DATABASE_THIRD', 'forge'),
            'username' => env('DB_USERNAME_THIRD', 'forge'),
            'password' => env('DB_PASSWORD_THIRD', ''),
            'charset' => 'utf8',
            'prefix' => '',
            'prefix_indexes' => true,
            'encrypt' => 'yes',
            'trust_server_certificate' => true,
        ],

        'ConnAccounting' => [
            'driver' => 'sqlsrv',
            'url' => env('DATABASE_URL'),
            'host' => env('DB_HOST_FOURTH', '127.0.0.1'),
            'port' => env('DB_PORT_FOURTH', '1433'),
            'database' => env('DB_DATABASE_FOURTH', 'forge'),
            'username' => env('DB_USERNAME_FOURTH', 'forge'),
            'password' => env('DB_PASSWORD_FOURTH', ''),
            'charset' => 'utf8',
            'prefix' => '',
            'prefix_indexes' => true,
            'encrypt' => 'yes',
            'trust_server_certificate' => true,
        ],

        'ConnUtility' => [
            'driver' => 'sqlsrv',
            'url' => env('DATABASE_URL'),
            'host' => env('DB_HOST_FIFTH', '127.0.0.1'),
            'port' => env('DB_PORT_FIFTH', '1433'),
            'database' => env('DB_DATABASE_FIFTH', 'forge'),
            'username' => env('DB_USERNAME_FIFTH', 'forge'),
            'password' => env('DB_PASSWORD_FIFTH', ''),
            'charset' => 'utf8',
            'prefix' => '',
            'prefix_indexes' => true,
            'encrypt' => 'yes',
            'trust_server_certificate' => true,
        ],

        'ConnJumboBag' => [
            'driver' => 'sqlsrv',
            'url' => env('DATABASE_URL'),
            'host' => env('DB_HOST_SIXTH', '127.0.0.1'),
            'port' => env('DB_PORT_SIXTH', '1433'),
            'database' => env('DB_DATABASE_SIXTH', 'forge'),
            'username' => env('DB_USERNAME_SIXTH', 'forge'),
            'password' => env('DB_PASSWORD_SIXTH', ''),
            'charset' => 'utf8',
            'prefix' => '',
            'prefix_indexes' => true,
            'encrypt' => 'yes',
            'trust_server_certificate' => true,
        ],

        'ConnExtruder' => [
            'driver' => 'sqlsrv',
            'url' => env('DATABASE_URL'),
            'host' => env('DB_HOST_EIGHTH', '127.0.0.1'),
            'port' => env('DB_PORT_EIGHTH', '1433'),
            'database' => env('DB_DATABASE_EIGHTH', 'forge'),
            'username' => env('DB_USERNAME_EIGHTH', 'forge'),
            'password' => env('DB_PASSWORD_EIGHTH', ''),
            'charset' => 'utf8',
            'prefix' => '',
            'prefix_indexes' => true,
            'encrypt' => 'yes',
            'trust_server_certificate' => true,
        ],

        'Connworkshop' => [
            'driver' => 'sqlsrv',
            'url' => env('DATABASE_URL'),
            'host' => env('DB_HOST_NINTH', '127.0.0.1'),
            'port' => env('DB_PORT_NINTH', '1433'),
            'database' => env('DB_DATABASE_NINTH', 'forge'),
            'username' => env('DB_USERNAME_NINTH', 'forge'),
            'password' => env('DB_PASSWORD_NINTH', ''),
            'charset' => 'utf8',
            'prefix' => '',
            'prefix_indexes' => true,
            'encrypt' => 'yes',
            'trust_server_certificate' => true,
        ],

        'ConnCircular' => [
            'driver' => 'sqlsrv',
            'url' => env('DATABASE_URL'),
            'host' => env('DB_HOST_TENTH', '127.0.0.1'),
            'port' => env('DB_PORT_TENTH', '1433'),
            'database' => env('DB_DATABASE_TENTH', 'forge'),
            'username' => env('DB_USERNAME_TENTH', 'forge'),
            'password' => env('DB_PASSWORD_TENTH', ''),
            'charset' => 'utf8',
            'prefix' => '',
            'prefix_indexes' => true,
            'encrypt' => 'yes',
            'trust_server_certificate' => true,
        ],

        'ConnABM' => [
            'driver' => 'sqlsrv',
            'url' => env('DATABASE_URL'),
            'host' => env('DB_HOST_ELEVENTH', '127.0.0.1'),
            'port' => env('DB_PORT_ELEVENTH', '1433'),
            'database' => env('DB_DATABASE_ELEVENTH', 'forge'),
            'username' => env('DB_USERNAME_ELEVENTH', 'forge'),
            'password' => env('DB_PASSWORD_ELEVENTH', ''),
            'charset' => 'utf8',
            'prefix' => '',
            'prefix_indexes' => true,
            'encrypt' => 'yes',
            'trust_server_certificate' => true,
        ],

        'ConnAdStar' => [
            'driver' => 'sqlsrv',
            'url' => env('DATABASE_URL'),
            'host' => env('DB_HOST_TWELFTH', '127.0.0.1'),
            'port' => env('DB_PORT_TWELFTH', '1433'),
            'database' => env('DB_DATABASE_TWELFTH', 'forge'),
            'username' => env('DB_USERNAME_TWELFTH', 'forge'),
            'password' => env('DB_PASSWORD_TWELFTH', ''),
            'charset' => 'utf8',
            'prefix' => '',
            'prefix_indexes' => true,
            'encrypt' => 'yes',
            'trust_server_certificate' => true,
        ],

        'ConnCircularMojosari' => [
            'driver' => 'sqlsrv',
            'url' => env('DATABASE_URL'),
            'host' => env('DB_HOST_THIRTEENTH', '127.0.0.1'),
            'port' => env('DB_PORT_THIRTEENTH', '1433'),
            'database' => env('DB_DATABASE_THIRTEENTH', 'forge'),
            'username' => env('DB_USERNAME_THIRTEENTH', 'forge'),
            'password' => env('DB_PASSWORD_THIRTEENTH', ''),
            'charset' => 'utf8',
            'prefix' => '',
            'prefix_indexes' => true,
            'encrypt' => 'yes',
            'trust_server_certificate' => true,
        ],

        'ConnTestQC' => [
            'driver' => 'sqlsrv',
            'url' => env('DATABASE_URL'),
            'host' => env('DB_HOST_FOURTEENTH', '127.0.0.1'),
            'port' => env('DB_PORT_FOURTEENTH', '1433'),
            'database' => env('DB_DATABASE_FOURTEENTH', 'forge'),
            'username' => env('DB_USERNAME_FOURTEENTH', 'forge'),
            'password' => env('DB_PASSWORD_FOURTEENTH', ''),
            'charset' => 'utf8',
            'prefix' => '',
            'prefix_indexes' => true,
            'encrypt' => 'yes',
            'trust_server_certificate' => true,
        ],

        'ConnGuard' => [
            'driver' => 'sqlsrv',
            'url' => env('DATABASE_URL'),
            'host' => env('DB_HOST_FIFTEENTH', '127.0.0.1'),
            'port' => env('DB_PORT_FIFTEENTH', '1433'),
            'database' => env('DB_DATABASE_FIFTEENTH', 'forge'),
            'username' => env('DB_USERNAME_FIFTEENTH', 'forge'),
            'password' => env('DB_PASSWORD_FIFTEENTH', ''),
            'charset' => 'utf8',
            'prefix' => '',
            'prefix_indexes' => true,
            'encrypt' => 'yes',
            'trust_server_certificate' => true,
        ],

        'ConnPublicWeb' => [
            'driver' => 'sqlsrv',
            'url' => env('DATABASE_URL'),
            'host' => env('DB_HOST_SIXTEENTH', '127.0.0.1'),
            'port' => env('DB_PORT_SIXTEENTH', '1433'),
            'database' => env('DB_DATABASE_SIXTEENTH', 'forge'),
            'username' => env('DB_USERNAME_SIXTEENTH', 'forge'),
            'password' => env('DB_PASSWORD_SIXTEENTH', ''),
            'charset' => 'utf8',
            'prefix' => '',
            'prefix_indexes' => true,
            'encrypt' => 'yes',
            'trust_server_certificate' => true,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Migration Repository Table
    |--------------------------------------------------------------------------
    |
    | This table keeps track of all the migrations that have already run for
    | your application. Using this information, we can determine which of
    | the migrations on disk haven't actually been run in the database.
    |
    */

    'migrations' => 'migrations',

    /*
    |--------------------------------------------------------------------------
    | Redis Databases
    |--------------------------------------------------------------------------
    |
    | Redis is an open source, fast, and advanced key-value store that also
    | provides a richer body of commands than a typical key-value system
    | such as APC or Memcached. Laravel makes it easy to dig right in.
    |
    */

    'redis' => [

        'client' => env('REDIS_CLIENT', 'phpredis'),

        'options' => [
            'cluster' => env('REDIS_CLUSTER', 'redis'),
            'prefix' => env('REDIS_PREFIX', Str::slug(env('APP_NAME', 'laravel'), '_') . '_database_'),
        ],

        'default' => [
            'url' => env('REDIS_URL'),
            'host' => env('REDIS_HOST', '127.0.0.1'),
            'username' => env('REDIS_USERNAME'),
            'password' => env('REDIS_PASSWORD'),
            'port' => env('REDIS_PORT', '6379'),
            'database' => env('REDIS_DB', '0'),
        ],

        'cache' => [
            'url' => env('REDIS_URL'),
            'host' => env('REDIS_HOST', '127.0.0.1'),
            'username' => env('REDIS_USERNAME'),
            'password' => env('REDIS_PASSWORD'),
            'port' => env('REDIS_PORT', '6379'),
            'database' => env('REDIS_CACHE_DB', '1'),
        ],

    ],

];
