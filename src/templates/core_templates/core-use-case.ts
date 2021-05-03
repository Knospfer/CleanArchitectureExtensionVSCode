export function coreUseCase() {
    return `part of '../core_imports.dart';

    abstract class UseCase<Type, Params> {
      Future<Either<Failure, Type>> call(Params params);
    }
    
    abstract class StreamUseCase<Type, Params> {
      Stream<Type> call(Params params);
    }
    `;
}