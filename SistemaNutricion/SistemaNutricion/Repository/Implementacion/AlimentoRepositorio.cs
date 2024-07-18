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
    public class AlimentoRepositorio : IAlimentoRepository
    {
        private readonly IGenrericRepository<Alimento> _alimentoRepositorio;
        private readonly IMapper _mapper;

        public AlimentoRepositorio(IGenrericRepository<Alimento> alimentoRepositorio, IMapper mapper)
        {
            _alimentoRepositorio = alimentoRepositorio;
            _mapper = mapper;
        }

        public async Task<List<AlimentoDTO>> ListaAlimentos()
        {
            try
            {
                var queryAlimento = await _alimentoRepositorio.Consultar();
                var listaAlimento = queryAlimento.ToList();
                return _mapper.Map<List<AlimentoDTO>>(listaAlimento);
            }
            catch
            {
                throw;
            }
        }

        public async Task<AlimentoDTO> ObtenerPorIdAlimento(int id)
        {
            try
            {
                var alimentoEncontrado = await _alimentoRepositorio.Obtenerid(a => a.Id == id);
                var alimento = alimentoEncontrado.FirstOrDefault();
                if (alimento == null)
                    throw new TaskCanceledException("Alimento no encontrado");
                return _mapper.Map<AlimentoDTO>(alimento);
            }
            catch
            {
                throw;
            }
        }

        public async Task<AlimentoDTO> CrearAlimento(AlimentoDTO modelo)
        {
            try
            {
                var alimentoCreado = await _alimentoRepositorio.Crear(_mapper.Map<Alimento>(modelo));
                if (alimentoCreado.Id == 0)
                    throw new TaskCanceledException("No se pudo crear el alimento");
                var query = await _alimentoRepositorio.Consultar(a => a.Id == alimentoCreado.Id);
                alimentoCreado = query.First();
                return _mapper.Map<AlimentoDTO>(alimentoCreado);
            }
            catch
            {
                throw;
            }
        }
    }
}
