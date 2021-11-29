using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AbstractFactory
{
    class Client
    {
        public void Main()
        {
            // The client code can work with any concrete factory class.
            Console.WriteLine("Especialista");
            ClientMethod(new ConcreteFactory1());
            Console.WriteLine();

            Console.WriteLine("Paciente");
            ClientMethod(new ConcreteFactory2());
        }

        public void ClientMethod(IAbstractFactory factory)
        {
            var productA = factory.CreateProductA();
            var productB = factory.CreateProductB();

            Console.WriteLine(productA.UsefulFunctionA());
            Console.WriteLine(productB.UsefulFunctionB());

        }
    }
}
