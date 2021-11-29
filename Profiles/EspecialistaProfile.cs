using CliMedAPI.Data.Dtos;
using CliMedAPI.Data.Dtos.Especialista;
using CliMedAPI.Model;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CliMedAPI.Profiles
{
    public class EspecialistaProfile : Profile
    {
        public EspecialistaProfile()
        {
            CreateMap<CreateEspecialistaDto, Especialista>();
            CreateMap<Especialista, ReadEspecialistaDto>();
            CreateMap<UpdateEspecialistaDto, Especialista>();
        }
    }
}
