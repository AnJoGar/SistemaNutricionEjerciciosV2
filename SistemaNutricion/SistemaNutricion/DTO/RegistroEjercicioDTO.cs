using SistemaNutricion.Models;

namespace SistemaNutricion.DTO
{
    public class RegistroEjercicioDTO
    {

        public int Id { get; set; }
        public int? UsuarioId { get; set; }
        public String? UsuarioDescripcion { get; set; }
        public int? EjercicioId { get; set; }
        public String? EjercicioDescripcion { get; set; }
        public float? TiempoEnMinutos { get; set; }
        public float? CaloriasQuemadas { get; set; }

    }
}
