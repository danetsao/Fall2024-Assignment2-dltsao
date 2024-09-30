using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Fall2024_Assignment2_dltsao.Models;

namespace Fall2024_Assignment2_dltsao.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [HttpGet("/api/get-bing-api-key")]
    public IActionResult GetBingApiKey()
    {
        var apiKey = Environment.GetEnvironmentVariable("BING_SEARCH_API_KEY");

        if (!string.IsNullOrEmpty(apiKey))
        {
            return Json(new { apiKey });
        }
        else
        {
            return Json(new { error = "API key not found" });
        }
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
