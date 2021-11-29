using AutoMapper;
using CliMedAPI.Data;
using CliMedAPI.Data.Dtos.Consulta;
using CliMedAPI.Data.Dtos;
using CliMedAPI.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CliMedAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ConsultaController : ControllerBase
    {
        private PacienteContext _contextCon;
        private IMapper _mapperCon;

        public ConsultaController(PacienteContext context, IMapper mapper)
        {
            _contextCon = context;
            _mapperCon = mapper;
        }

        [HttpGet]
        public IEnumerable<Consulta> GetConsultas()
        {
            return _contextCon.Consultas;
        }

        [HttpPost]
        public IActionResult AddConsulta([FromBody] CreateConsultaDto consultaDto)
        {
            Consulta consulta = _mapperCon.Map<Consulta>(consultaDto);
            _contextCon.Consultas.Add(consulta);
            _contextCon.SaveChanges();
            return CreatedAtAction(nameof(GetConsultaById), new { codigo = consulta.codigo }, consulta);
        }

        [HttpGet("{codigo}")]
        public IActionResult GetConsultaById(int codigo)
        {
            Consulta consulta = _contextCon.Consultas.FirstOrDefault(consulta => consulta.codigo == codigo);
            if (consulta != null)
            {
                ReadConsultaDto consultaDto = _mapperCon.Map<ReadConsultaDto>(consulta);
                return Ok(consultaDto);
            }
            return NotFound();
        }

        [HttpPut("{codigo}")]
        public IActionResult UpdateConsulta(int codigo, [FromBody] UpdateConsultaDto consultaDto)
        {
            Consulta consulta1 = _contextCon.Consultas.FirstOrDefault(consulta1 => consulta1.codigo == codigo);
            if (consulta1 == null)
            {
                return NotFound();
            }
            _mapperCon.Map(consultaDto, consulta1);
            _contextCon.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{codigo}")]
        public IActionResult DeleteConsulta(int codigo)
        {
            Consulta consulta = _contextCon.Consultas.FirstOrDefault(consulta => consulta.codigo == codigo);
            if (consulta == null)
            {
                return NotFound();
            }
            _contextCon.Remove(consulta);
            _contextCon.SaveChanges();
            return NoContent();
        }
    }
}
