import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ApiService', () => {
    let service: ApiService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ApiService]
        });
        service = TestBed.inject(ApiService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should register a user', () => {
        const dummyUser = { token: '123' };
        const registerData = { name: 'Test', email: 'test@test.com' };

        service.register(registerData).subscribe(res => {
            expect(res).toEqual(dummyUser);
        });

        const req = httpMock.expectOne('http://localhost:5000/api/auth/register');
        expect(req.request.method).toBe('POST');
        req.flush(dummyUser);
    });
});
