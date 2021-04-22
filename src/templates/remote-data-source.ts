export function remoteDataSourceTemplate(fileName: string) {
    return `import 'package:injectable/injectable.dart';

        abstract class ${fileName}RemoteDataSource {
          //  TODO DECLARE METHOD
        }
        
        @LazySingleton(as: ${fileName}RemoteDataSource)
        class ${fileName}RemoteDataSourceConcrete
            implements ${fileName}RemoteDataSource {
          const ${fileName}RemoteDataSourceConcrete();
        
          //  TODO IMPLEMENT METHOD
        }`;
}