using SistemaNutricion.DTO;

namespace SistemaNutricion.Repository.Interfaces
{
    public interface IRegistroEjercicioRepository
    {
        Task<List<RegistroEjercicioDTO>> listaRegistroEjercicio();
        Task<List<CosultarFechaDTO>> listaRegistroEjercicio2();

        Task<RegistroEjercicioDTO> obtenerPorIdRegistroEjercicio(int id);

        Task<RegistroEjercicioDTO> crearRegistroEjercicio(RegistroEjercicioDTO modelo);
        Task<List<CosultarFechaDTO>> ReporteEjercicio(string fechaInicio);

    }
}
