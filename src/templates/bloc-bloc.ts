export function blocBloc(fileName: string) {
    return `import 'dart:async';
    import 'package:bloc/bloc.dart';
    import 'package:injectable/injectable.dart';
    
    @injectable
    class ${fileName}Bloc extends Bloc<${fileName}Event, ${fileName}State> {
      final ${fileName}UseCase ${fileName}UseCase;
    
      ${fileName}Bloc(this.${fileName}UseCase) : super(${fileName}Initial());
    
      @override
      Stream<${fileName}State> mapEventToState(
        ${fileName}Event event,
      ) async* {
        if (event is EVENT_TO_IMPLEMET) {
          yield ${fileName}Loading();
          final either = await ${fileName}UseCase(${fileName}Params(event.data)); //    TODO IMPLEMENT!
          yield* either.fold((failure) async* {
            yield ${fileName}Error();
          }, (_) async* {
            yield ${fileName}Loaded();
          });
        }
      }
    }`;
}