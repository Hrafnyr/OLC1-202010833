import os




def crearDOT():
    path = "C:\\Users\Moises\\Documents\\NetBeansProjects\\Proyecto 1\\src"
    comandoDot = 'dot -Tjpg ' + path + '\\arbolS.dot -o ' + path + '\\arbolS.jpg'
    os.system(comandoDot)


def main():
    crearDOT()

if __name__ == '__main__':
    main()