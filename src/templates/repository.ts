export function repository(filename: String) {
    return `import 'package:dartz/dartz.dart';
    import 'package:event_app/core/errors/failures.dart';
    import 'package:event_app/core/models/event_model.dart';
    
    abstract class ${filename}Repositoy {
      Future<Either<Failure, TO_IMPLEMENT>> METHOD_NAME();
    } `;
}