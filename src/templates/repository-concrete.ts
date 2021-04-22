export function repositoryConcrete(fileName: string) { 
    return `import 'package:dartz/dartz.dart';
    import 'package:injectable/injectable.dart';
    
    @LazySingleton(as: ${fileName}Repositoy)
    class ${fileName}RepositoryConcrete implements ${fileName}Repositoy {
      final ${fileName}LocalDataSource dataSource;
    
      ${fileName}RepositoryConcrete(this.dataSource);
    
      @override
      Future<Either<Failure, TO_IMPLEMENT>> METHOD_NAME() async {
        //  TODO IMPLEMENT METHOD
      }
    }`;
}