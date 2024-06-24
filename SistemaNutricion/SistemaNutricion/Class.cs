using Microsoft.Data.SqlClient;
using System;
using System.Data.SqlClient;
namespace SistemaNutricion
{
    public class Class
    {

        static void Main()
        {
            string connectionString = "Server=your_server;Database=SistemaNutricion;User Id=your_user;Password=your_password;";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    Console.WriteLine("Conexión exitosa");
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error de conexión: " + ex.Message);
                }
            }
        }
    }
}
