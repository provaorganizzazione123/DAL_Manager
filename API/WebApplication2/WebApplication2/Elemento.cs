﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApplication2
{   //***** MODEL che rispecchia la tabella [Arc_Elemento] *****//
    public class Elemento
    {
        public string IdElemento { get; set; }
        public string NomeElemento { get; set; }
        public string DescrizioneElemento { get; set; }
        public string Id_Contenitore { get; set; }
    }
}
