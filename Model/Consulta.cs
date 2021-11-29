using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CliMedAPI.Model
{
    public class Consulta
    {
        [Key]
        [Required]
        public int codigo { get; set; }
        [Required(ErrorMessage = "A data da consulta é obrigatória")]
        public DateTime dataConsulta { get; set; }
        public virtual Paciente Paciente { get; set; }
        [Required(ErrorMessage = "Informe o id do paciente dessa consulta!")]
        public int PacienteId { get; set; }
        public virtual Especialista Especialista { get; set; }
        [Required(ErrorMessage = "Informe o id do especialista dessa consulta!!")]
        public int EspecialistaId { get; set; }
    }
}
