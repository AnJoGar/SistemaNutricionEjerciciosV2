using Microsoft.AspNetCore.Mvc;
using SistemaNutricion.DTO;
using SistemaNutricion.Models;
using SistemaNutricion.Repository.Interfaces;
using SistemaNutricion.Utilidades;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
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
    public class RegistroAlimentoController : ControllerBase
    {
        private readonly IRegistroAlimentoRepository _registroAlimentoService;

        public RegistroAlimentoController(IRegistroAlimentoRepository registroAlimentoService)
        {
            _registroAlimentoService = registroAlimentoService;
        }

        // POST: api/RegistroAlimentos
        [HttpPost]
        public async Task<IActionResult> Guardar([FromBody] RegistroAlimentoDTO registroAlimento)
        {
            var rsp = new Response<RegistroAlimentoDTO>();
            try
            {
                rsp.status = true;
                rsp.value = await _registroAlimentoService.CrearRegistroAlimento(registroAlimento);
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
            var rsp = new Response<List<RegistroAlimentoDTO>>();
            try
            {
                rsp.status = true;
                rsp.value = await _registroAlimentoService.ListaRegistroAlimento();
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
                rsp.value = await _registroAlimentoService.ReporteAlimento(fechaInicio);
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
                rsp.value = await _registroAlimentoService.ListaRegistroAlimento2();
            }
            catch (Exception ex)
            {
                rsp.status = false;
                rsp.msg = ex.Message;
            }
            return Ok(rsp);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RegistroAlimentoDTO>> GetById(int id)
        {
            try
            {
                var registroAlimento = await _registroAlimentoService.ObtenerPorIdRegistroAlimento(id);
                if (registroAlimento == null)
                    return NotFound();
                return Ok(registroAlimento);
            }
            catch
            {
                return StatusCode(500, "Error al obtener el Registro de Alimento por ID");
            }
        }
    }
}
