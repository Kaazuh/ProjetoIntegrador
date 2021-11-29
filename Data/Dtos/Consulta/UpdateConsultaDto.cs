using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CliMedAPI.Data.Dtos
{
    public class UpdateConsultaDto
    {
        [Required(ErrorMessage = "A data da consulta � obrigat�ria")]
        public DateTime dataConsulta { get; set; }
        [Required(ErrorMessage = "O campo PacienteId � obrigat�rio!")]
        public int PacienteId { get; set; }
        [Required(ErrorMessage = "O campo EspecialistaId � obrigat�rio!")]
        public int EspecialistaId { get; set; }
    }
}
