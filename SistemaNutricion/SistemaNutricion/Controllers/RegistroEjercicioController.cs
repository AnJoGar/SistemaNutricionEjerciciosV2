using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
using SistemaNutricion.Utilidades;
using AutoMapper;

namespace SistemaNutricion.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistroEjercicioController : ControllerBase
    {

        private readonly IRegistroEjercicioRepository _registroEjercicioService;

        public RegistroEjercicioController(IRegistroEjercicioRepository registroEjercicioService)
        {
            _registroEjercicioService = registroEjercicioService;
        }

        // POST: api/RegistroEjercicios
        [HttpPost]
        public async Task<ActionResult<RegistroEjercicioDTO>> PostRegistroEjercicio(RegistroEjercicioDTO registroEjercicioDTO)
        {
            try
            {
                var resultado = await _registroEjercicioService.crearRegistroEjercicio(registroEjercicioDTO);

                return CreatedAtAction("GetRegistroEjercicio", new { id = resultado.Id }, resultado);
            }
            catch (TaskCanceledException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            var rsp = new Response<List<RegistroEjercicioDTO>>();
            try
            {
                rsp.status = true;
                rsp.value = await _registroEjercicioService.listaRegistroEjercicio();
            }
            catch (Exception ex)
            {
                rsp.status = false;
                rsp.msg = ex.Message;
            }
            return Ok(rsp);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RegistroEjercicioDTO>> GetById(int id)
        {
            try
            {
                var odontologo = await _registroEjercicioService.obtenerPorIdRegistroEjercicio(id);
                if (odontologo == null)
                    return NotFound();
                return Ok(odontologo);
            }
            catch
            {
                return StatusCode(500, "Error al obtener el Odontólogo por ID");
            }
        }








    }
}
