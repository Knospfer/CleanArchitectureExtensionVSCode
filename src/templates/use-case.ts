export function useCase(fileName: string) {
    return `import 'package:event_app/core/errors/failures.dart';
    import 'package:dartz/dartz.dart';
    import 'package:event_app/core/use_cases/use_case.dart';
    import 'package:injectable/injectable.dart';
    
    class ${fileName}Params {
      final EventModel data;
    
      ${fileName}Params(this.data);
    }
    
    @lazySingleton
    class ${fileName}UseCase implements UseCase<TO_IMPLEMENT, ${fileName}Params> {
      final ${fileName}Repositoy repositoy;
    
      ${fileName}UseCase(this.repositoy);
    
      @override
      Future<Either<Failure, TO_IMPLEMENT>> call(${fileName}Params params) async {
        return await repositoy.METHOD(params.data);
      }
    }`;
}