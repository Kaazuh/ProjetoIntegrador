using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CliMedAPI.Data.Dtos
{
    public class ReadPacienteDto
    {
        [Required(ErrorMessage = "O campo Nome é obrigatório!")]
        public string nomePaciente { get; set; }
        [Required(ErrorMessage = "O campo Cpf é obrigatório e precisa conter 11 números!")]
        [StringLength(11, ErrorMessage = "O campo Cpf precisa de exatamente 11 números!")]
        public string cpf { get; set; }
        [Required(ErrorMessage = "O campo Telefone é obrigatório e precisa conter 8 números!")]
        [StringLength(8, ErrorMessage = "O campo Telefone precisa de exatamente 8 números!")]
        public string telefone { get; set; }
        [Required(ErrorMessage = "O campo Data de Nascimento é obrigatório!")]
        public DateTime dataNascimento { get; set; }
        [Required(ErrorMessage = "O campo PlanoSaude é obrigatório com true ou false")]
        public bool planoSaude { get; set; }
        public object Consultas { get; set; }
    }
}
