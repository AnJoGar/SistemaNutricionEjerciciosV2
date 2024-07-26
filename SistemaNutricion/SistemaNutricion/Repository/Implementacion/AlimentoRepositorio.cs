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
          private readonly SistemaNutricionDBcontext _context;

        public AlimentoRepositorio(SistemaNutricionDBcontext context)
        {
            _context = context;
        }

        public async Task<List<AlimentoDTO>> ListaAlimentos()
        {
            var alimentos = await _context.Alimentos.ToListAsync();
            return alimentos.Select(a => new AlimentoDTO
            {
                Id = a.Id,
                Nombre = a.Nombre,
                Calorias = a.Calorias,
                Carbohidratos = a.Carbohidratos,
                Grasas = a.Grasas,
                Proteinas = a.Proteinas,
                Sodio = a.Sodio,
                Azucar = a.Azucar
            }).ToList();
        }

        public async Task<AlimentoDTO> ObtenerPorIdAlimento(int id)
        {
            var alimento = await _context.Alimentos.FindAsync(id);
            if (alimento == null)
                return null;

            return new AlimentoDTO
            {
                Id = alimento.Id,
                Nombre = alimento.Nombre,
                Calorias = alimento.Calorias,
                Carbohidratos = alimento.Carbohidratos,
                Grasas = alimento.Grasas,
                Proteinas = alimento.Proteinas,
                Sodio = alimento.Sodio,
                Azucar = alimento.Azucar
            };
        }

        public async Task<AlimentoDTO> CrearAlimento(AlimentoDTO modelo)
        {
            var alimento = new Alimento
            {
                Nombre = modelo.Nombre,
                Calorias = modelo.Calorias,
                Carbohidratos = modelo.Carbohidratos,
                Grasas = modelo.Grasas,
                Proteinas = modelo.Proteinas,
                Sodio = modelo.Sodio,
                Azucar = modelo.Azucar
            };

            _context.Alimentos.Add(alimento);
            await _context.SaveChangesAsync();

            modelo.Id = alimento.Id;
            return modelo;
        }
    }
}