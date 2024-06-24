using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using System.Linq;
using SistemaNutricion.Repository.Contratos;
using SistemaNutricion.Repository.Interfaces;
using SistemaNutricion.Repository;
using SistemaNutricion.Models;
using SistemaNutricion.DTO;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;
using System.Security.Cryptography;


namespace SistemaNutricion.Repository.Implementacion
{
    public class EjercicioRepositorio
    {


        public class EjercicioRepository : IEjercicioRepository
        {
            private readonly IGenrericRepository<Ejercicio> _EjercicioRepositorio;
            private readonly IMapper _mapper;



            public EjercicioRepository(IGenrericRepository<Ejercicio> ejercicioRepositorio, IMapper mapper)
            {
                _EjercicioRepositorio = ejercicioRepositorio;
                _mapper = mapper;
            }



            public async Task<List<EjercicioDTO>> listaEjercicios()
            {
               
                try
                {
                    var queryEjercicio = await _EjercicioRepositorio.Consultar();
                    var listaEjericio = queryEjercicio.ToList();
                    // Recorremos la lista de usuarios y reemplazamos el hash de la contraseña por el texto plano
                    return _mapper.Map<List<EjercicioDTO>>(listaEjericio);
                }
                catch
                {

                    throw;
                }
            }

            public async Task<EjercicioDTO> obtenerPorIdEjercicio(int id)
            {
                try
                {
                    var EjercicioEncontrado = await _EjercicioRepositorio
                        .Obtenerid(u => u.Id == id);
                    var listaUsuario = EjercicioEncontrado.ToList();
                    var Ejercicio = listaUsuario.FirstOrDefault();
                    if (Ejercicio == null)
                        throw new TaskCanceledException("Usuario no encontrado");
                    return _mapper.Map<EjercicioDTO>(Ejercicio);
                }
                catch
                {
                    throw;
                }
            }


            public async Task<EjercicioDTO> crearEjercicio(EjercicioDTO modelo)
            {
                try
                {
           
                    var EjercicioCreado = await _EjercicioRepositorio.Crear(_mapper.Map<Ejercicio>(modelo));

                    if (EjercicioCreado.Id == 0)
                        throw new TaskCanceledException("No se pudo Crear");
                    var query = await _EjercicioRepositorio.Consultar(u => u.Id == EjercicioCreado.Id);
                    EjercicioCreado = query.First();
                    return _mapper.Map<EjercicioDTO>(EjercicioCreado);
                }
                catch
                {
                    throw;
                }
            }







        }












    }
}
