using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CliMedAPI.Data.Dtos.Consulta
{
    public class CreateConsultaDto
    {
        [Required(ErrorMessage = "A data da consulta é obrigatória")]
        public DateTime dataConsulta { get; set; }
        [Required(ErrorMessage = "Informe o id do paciente dessa consulta!")]
        public int PacienteId { get; set; }
        [Required(ErrorMessage = "Informe o id do especialista dessa consulta!")]
        public int EspecialistaId { get; set; }
    }
}
