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


       
      //  private readonly IMapper _mapper;



        // POST: api/RegistroEjercicios
        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] RegistroEjercicioDTO usuario)
        {
            


            var rsp = new Response<RegistroEjercicioDTO>();
            try
            {
                rsp.status = true;
                rsp.value = await _registroEjercicioService.crearRegistroEjercicio(usuario);
            }
            catch (Exception ex)
            {
                rsp.status = false;
                rsp.msg = ex.Message;
            }
            return Ok(rsp);
        }
    

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            var rsp = new Response<List<RegistroEjercicioDTO>>();
            try
            {
                rsp.status = true;


                var listaRegistros = await _registroEjercicioService.listaRegistroEjercicio();

                // Formatear manualmente la fecha en cada RegistroEjercicioDTO
              

                rsp.value = await _registroEjercicioService.listaRegistroEjercicio();
            }
            catch (Exception ex)
            {
                rsp.status = false;
                rsp.msg = ex.Message;
            }
            return Ok(rsp);
        }


        [HttpGet]
        [Route("Reporte")]
        public async Task<IActionResult> Reporte(string? fechaInicio)
        {
            var rsp = new Response<List<ConsultarFechaDTO>>();
            try
            {
                rsp.status = true;
                rsp.value = await _registroEjercicioService.ReporteEjercicio(fechaInicio);
            }
            catch (Exception ex)
            {
                rsp.status = false;
                rsp.msg = ex.Message;
            }
            return Ok(rsp);
        }

        [HttpGet]
        [Route("Lista2")]
        public async Task<IActionResult> ListaR()
        {
            var rsp = new Response<List<ConsultarFechaDTO>>();
            try
            {
                rsp.status = true;


                var listaRegistros = await _registroEjercicioService.listaRegistroEjercicio2();

                // Formatear manualmente la fecha en cada RegistroEjercicioDTO


                rsp.value = await _registroEjercicioService.listaRegistroEjercicio2();
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

        [HttpGet("ByUserId/{id}")]
        public async Task<ActionResult<RegistroEjercicioDTO>> GetByIdU(int id)
        {
            try
            {
                var odontologo = await _registroEjercicioService.obtenerPorIdUsuario(id);
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
