using SistemaNutricion.DTO;

namespace SistemaNutricion.Repository.Interfaces
{
    public interface IRegistroEjercicioRepository
    {
        Task<List<RegistroEjercicioDTO>> listaRegistroEjercicio();
        Task<List<ConsultarFechaDTO>> listaRegistroEjercicio2();

        Task<RegistroEjercicioDTO> obtenerPorIdRegistroEjercicio(int id);
        Task<List<RegistroEjercicioDTO>> obtenerPorIdUsuario(int id);

        Task<RegistroEjercicioDTO> crearRegistroEjercicio(RegistroEjercicioDTO modelo);
        Task<List<ConsultarFechaDTO>> ReporteEjercicio(string fechaInicio);

    }
}
