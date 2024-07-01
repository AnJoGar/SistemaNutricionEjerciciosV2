using Microsoft.EntityFrameworkCore;

namespace SistemaNutricion.Models
{
    public class RegistroEjercicio
    {

        public int Id { get; set; }
       public int UsuarioId { get; set; }
        public int EjercicioId { get; set; }
        public Double TiempoEnMinutos { get; set; }
        public Double CaloriasQuemadas { get; set; }
        public DateTime? FechaRegistro { get; set; }

        public  Ejercicio Ejercicio { get; set; }
        public Usuario Usuario { get; set; }
    }
}
