using SistemaNutricion.DTO;

namespace SistemaNutricion.Repository.Interfaces
{
    public interface IRegistroEjercicioRepository
    {
        Task<List<RegistroEjercicioDTO>> listaRegistroEjercicio();

        Task<RegistroEjercicioDTO> obtenerPorIdRegistroEjercicio(int id);

        Task<RegistroEjercicioDTO> crearRegistroEjercicio(RegistroEjercicioDTO modelo);

    }
}
