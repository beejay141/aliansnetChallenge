using AliansnetTechnicalChallenge.Infrastructure.Data.SeedData;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Serilog;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AliansnetTechnicalChallenge.APP
{
    public class Program
    {
        private static IConfiguration configuration { get; } = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile($"appsettings.{Environment.GetEnvironmentVariable("ASPNET_ENVIRONMENT")}.json", true)
            .AddEnvironmentVariables().Build();


        public static void Main(string[] args)
        {
            Log.Logger = new LoggerConfiguration().MinimumLevel.Information()
               .MinimumLevel.Override("Microsoft", Serilog.Events.LogEventLevel.Warning)
               .WriteTo.Console()
               .WriteTo.File(Path.Combine(GetLogPath(), "log.txt"), shared: true, rollingInterval: RollingInterval.Hour).CreateLogger();

            var host = CreateHostBuilder(args).Build();

            using var scope = host.Services.CreateScope();
            var services = scope.ServiceProvider;

            try
            {
                DBSeed.Initialize(services).Wait();
            }
            catch (Exception ex)
            {
                var logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "An error occurred seeding the DB.");
            }

            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>().
                    UseSerilog();
                });

        private static string GetLogPath()
        {
            return string.IsNullOrWhiteSpace(configuration["Logging:logPath"]) ? $"{Path.Combine(Directory.GetCurrentDirectory(), "Logs")}" : configuration["Logging:logPath"];
        }
    }
}
