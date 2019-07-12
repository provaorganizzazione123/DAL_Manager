using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;
using MVC.Models;
using Newtonsoft.Json;

namespace MVC.Controllers
{
    public class ElementoController : Controller
    {
        // GET: Elemento
        //public ActionResult Index()
        //{
        //    IEnumerable<mvcElementoModel> empList;
        //    HttpResponseMessage response = GlobalVariables.webApiClient.GetAsync("Elemento").Result;
        //    empList = response.Content.ReadAsAsync<IEnumerable<mvcElementoModel>>().Result;
        //    return View(empList);
        //}
        public ActionResult Index()
        {
            IEnumerable<mvcElementoModel> empList;
            HttpResponseMessage response = GlobalVariables.webApiClient.GetAsync("Elemento").Result;
            empList = response.Content.ReadAsAsync<IEnumerable<mvcElementoModel>>().Result;
            return View(empList);
        }

        [HttpGet]
        public ActionResult AddOrEdit( int ?id)
        {
            return View(new mvcElementoModel());
        }
        [HttpPost]
        public ActionResult AddOrEdit(mvcElementoModel ele)
        {
            HttpResponseMessage response = GlobalVariables.webApiClient.PostAsJsonAsync("Elemento", ele).Result;
            return RedirectToAction("Index");
        }
    }
}