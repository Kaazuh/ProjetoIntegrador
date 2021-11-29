using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CliMedAPI.Data.Dtos.Especialista
{
    public class CreateEspecialistaDto
    {
        [Required(ErrorMessage = "O campo Crm é obrigatório!")]
        public int crm { get; set; }

        [Required(ErrorMessage = "O campo NomeEspecialista é obrigatório!")]
        public string nomeEspecialista { get; set; }

        [Required(ErrorMessage = "O campo Especialidade é obrigatório!")]
        public string especialidade { get; set; }

        [Required(ErrorMessage = "O campo Telefone é obrigatório e precisa conter 8 números")]
        [StringLength(8, ErrorMessage = "O campo Telefone precisa de exatamente 8 números")]
        public string telefone { get; set; }

        [Required(ErrorMessage = "O campo Email é obrigatório!")]
        public string email { get; set; }

        [Required(ErrorMessage = "O campo ExigePlano é obrigatório com true ou false")]
        public bool exigePlano { get; set; }
    }
}
