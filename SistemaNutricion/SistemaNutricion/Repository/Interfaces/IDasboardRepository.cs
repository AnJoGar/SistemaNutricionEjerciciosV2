using SistemaNutricion.DTO;

namespace SistemaNutricion.Repository.Interfaces
{
    public interface IDasboardRepository
    {
        Task<DasboardDTO> listaDasboard(int id);


        Task<List<DasboardDTO>> listaDasboard1();
        Task<List<RegistroEjercicioDTO>> listaDasboard2();


    }
}
