using CliMedAPI.Data;
using CliMedAPI.Data.Dtos;
using CliMedAPI.Data.Dtos.Especialista;
using CliMedAPI.Model;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace CliMedAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EspecialistaController : ControllerBase
    {
        private PacienteContext _contextEsp;
        private IMapper _mapperEsp;

        public EspecialistaController(PacienteContext context, IMapper mapper)
        {
            _contextEsp = context;
            _mapperEsp = mapper;
        }

        [HttpPost]
        public IActionResult AddEspecialista([FromBody] CreateEspecialistaDto especialistaDto)
        {
            Especialista especialista = _mapperEsp.Map<Especialista>(especialistaDto);
            _contextEsp.Especialistas.Add(especialista);
            _contextEsp.SaveChanges();
            return CreatedAtAction(nameof(GetEspecialistaById), new { id = especialista.id }, especialista);
        }

        [HttpGet]
        public IEnumerable<Especialista> GetEspecialistas()
        {
            return _contextEsp.Especialistas;
        }

        [HttpGet("{crm}")]
        public IActionResult GetEspecialistaById(int crm)
        {
            Especialista especialista = _contextEsp.Especialistas.FirstOrDefault(especialista => especialista.crm == crm);

            if (especialista != null)
            {
                ReadEspecialistaDto especialistaDto = _mapperEsp.Map<ReadEspecialistaDto>(especialista);
                return Ok(especialistaDto);
            }
            return NotFound();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateEspecialista(int id, [FromBody] UpdateEspecialistaDto especialistaDto)
        {
            Especialista especialista1 = _contextEsp.Especialistas.FirstOrDefault(especialista1 => especialista1.id == id);
            if (especialista1 == null)
            {
                return NotFound();
            }
            _mapperEsp.Map(especialistaDto, especialista1);
            _contextEsp.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEspecialista(int id)
        {
            Especialista especialista = _contextEsp.Especialistas.FirstOrDefault(especialista => especialista.id == id);
            if (especialista == null)
            {
                return NotFound();
            }
            _contextEsp.Remove(especialista);
            _contextEsp.SaveChanges();
            return NoContent();
        }

    }
}
