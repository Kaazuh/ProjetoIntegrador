using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CliMedAPI.Data.Dtos
{
    public class UpdateConsultaDto
    {
        [Required(ErrorMessage = "A data da consulta é obrigatória")]
        public DateTime dataConsulta { get; set; }
        [Required(ErrorMessage = "O campo PacienteId é obrigatório!")]
        public int PacienteId { get; set; }
        [Required(ErrorMessage = "O campo EspecialistaId é obrigatório!")]
        public int EspecialistaId { get; set; }
    }
}
