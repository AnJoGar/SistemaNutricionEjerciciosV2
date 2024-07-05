using Microsoft.AspNetCore.Mvc;
using SistemaNutricion.DTO;
using SistemaNutricion.Models;
using SistemaNutricion.Repository.Interfaces;
using SistemaNutricion.Utilidades;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SistemaNutricion.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlimentoController : ControllerBase
    {
        private readonly IAlimentoRepository _context;

        public AlimentoController(IAlimentoRepository context)
        {
            _context = context;
        }

        // GET: api/Alimentos
        [HttpGet]
        [Route("Lista")]
        public async Task<ActionResult> Lista()
        {
            var rsp = new Response<List<AlimentoDTO>>();
            try
            {
                rsp.Status = true;
                rsp.Value = await _context.ListaAlimentos();
            }
            catch (Exception ex)
            {
                rsp.Status = false;
                rsp.Msg = ex.Message;
            }
            return Ok(rsp);
        }

        // GET: api/Alimentos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AlimentoDTO>> GetAlimento(int id)
        {
            try
            {
                var alimento = await _context.ObtenerPorIdAlimento(id);
                if (alimento == null)
                    return NotFound();
                return Ok(alimento);
            }
            catch
            {
                return StatusCode(500, "Error al obtener el Alimento por ID");
            }
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] AlimentoDTO alimento)
        {
            var rsp = new Response<AlimentoDTO>();
            try
            {
                rsp.Status = true;
                rsp.Value = await _context.CrearAlimento(alimento);
            }
            catch (Exception ex)
            {
                rsp.Status = false;
                rsp.Msg = ex.Message;
            }
            return Ok(rsp);
        }
    }
}
