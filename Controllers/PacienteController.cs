using AutoMapper;
using CliMedAPI.Data;
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
    public class PacienteController : ControllerBase
    {
        private PacienteContext _context;
        private IMapper _mapper;

        public PacienteController(PacienteContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public IEnumerable<Paciente> GetPacientes()
        {
            return _context.Pacientes;
        }

        [HttpPost]
        public IActionResult AddPaciente([FromBody] CreatePacienteDto pacienteDto)
        {
            Paciente paciente = _mapper.Map<Paciente>(pacienteDto);
            _context.Pacientes.Add(paciente);
            _context.SaveChanges();
            //return Ok();
            return CreatedAtAction(nameof(GetPacienteById), new { id = paciente.id }, paciente);
            //Console.WriteLine(paciente.Cpf);
        }

        [HttpGet("{cpf}")]
        public IActionResult GetPacienteById(string cpf)
        {
            Paciente paciente = _context.Pacientes.FirstOrDefault(paciente => paciente.cpf == cpf);
            if (paciente != null)
            {
                ReadPacienteDto pacienteDto = _mapper.Map<ReadPacienteDto>(paciente);
                return Ok(pacienteDto);
            }
            return NotFound();
        }

        [HttpPut("{id}")]
        public IActionResult UpdatePaciente(int id, [FromBody] UpdatePacienteDto pacienteDto)
        {
            Paciente paciente1 = _context.Pacientes.FirstOrDefault(paciente1 => paciente1.id == id);
            if (paciente1 == null)
            {
                return NotFound();
            }
            _mapper.Map(pacienteDto, paciente1);
            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeletePaciente(int id)
        {
            Paciente paciente = _context.Pacientes.FirstOrDefault(paciente => paciente.id == id);
            if(paciente == null)
            {
                return NotFound();
            }
            _context.Remove(paciente);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
