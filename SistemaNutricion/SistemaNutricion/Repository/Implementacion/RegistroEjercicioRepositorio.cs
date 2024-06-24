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
    public class RegistroEjercicioRepositorio: IRegistroEjercicioRepository 
    {


        private readonly IGenrericRepository<RegistroEjercicio> _EjercicioRepositorio;
        private readonly IMapper _mapper;

        public RegistroEjercicioRepositorio(IGenrericRepository<RegistroEjercicio> ejercicioRepositorio, IMapper mapper)
        {
            _EjercicioRepositorio = ejercicioRepositorio;
            _mapper = mapper;
        }

        public async Task<List<RegistroEjercicioDTO>> listaRegistroEjercicio()
        {

            try
            {
                var queryEjercicio = await _EjercicioRepositorio.Consultar();
                var listaEjericio = queryEjercicio
                    .Include(re => re.Ejercicio)
                    .Include(re => re.Usuario)
                    .ToList(); 
                // Recorremos la lista de usuarios y reemplazamos el hash de la contraseña por el texto plano
                return _mapper.Map<List<RegistroEjercicioDTO>>(listaEjericio);
            }
            catch
            {

                throw;
            }
        }

        public async Task<RegistroEjercicioDTO> obtenerPorIdRegistroEjercicio(int id)
        {
            try
            {
                var EjercicioEncontrado = await _EjercicioRepositorio
                    .Obtenerid(u => u.Id == id);
                var listaUsuario = EjercicioEncontrado.Include(re => re.Ejercicio)
                    .Include(re => re.Usuario)
                    .ToList(); 
                var Ejercicio = listaUsuario.FirstOrDefault();
                if (Ejercicio == null)
                    throw new TaskCanceledException("Usuario no encontrado");
                return _mapper.Map<RegistroEjercicioDTO>(Ejercicio);
            }
            catch
            {
                throw;
            }
        }


        public async Task<RegistroEjercicioDTO> crearRegistroEjercicio(RegistroEjercicioDTO modelo)
        {
            try
            {
                var ejercicioQuery = await _EjercicioRepositorio.Consultar(e => e.Id == modelo.EjercicioId);
                var ejercicio = await ejercicioQuery.FirstOrDefaultAsync();

                var EjercicioCreado = await _EjercicioRepositorio.Crear(_mapper.Map<RegistroEjercicio>(modelo));

                if (EjercicioCreado.Id == 0)
                    throw new TaskCanceledException("No se pudo Crear");
                modelo.CaloriasQuemadas = ejercicio.CaloriasQuemadas * modelo.TiempoEnMinutos;
               

                var registroEjercicio = _mapper.Map<RegistroEjercicio>(modelo);
                var ejercicioCreado = await _EjercicioRepositorio.Crear(registroEjercicio);


                var query = await _EjercicioRepositorio.Consultar(u => u.Id == EjercicioCreado.Id);
                var registroEjercicioConRelaciones = query
                    .Include(re => re.Ejercicio)
                    .Include(re => re.Usuario)
                    .FirstOrDefault();

                // Mapear el resultado a DTO
                return _mapper.Map<RegistroEjercicioDTO>(registroEjercicioConRelaciones);
            }
            catch
            {
                throw;
            }
        }



    }
}
