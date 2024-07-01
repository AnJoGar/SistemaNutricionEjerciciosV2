namespace SistemaNutricion.DTO
{
    public class CosultarFechaDTO
    {

        public int Id { get; set; }
        public int? UsuarioId { get; set; }
        public String? UsuarioDescripcion { get; set; }
        public int? EjercicioId { get; set; }
        public String? EjercicioDescripcion { get; set; }
        //public double? EjercicioValor { get; set; }
        public double? TiempoEnMinutos { get; set; }
        public double? CaloriasQuemadas { get; set; }

        public string? FechaRegistro { get; set; }

    }
}
