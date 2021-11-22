import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, flushMicrotasks, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { ColorsService } from './colors.service';

describe('ColorsService', () => {
  let service: ColorsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ColorsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should getColorList', waitForAsync(() => {
    expect(service).toBeTruthy();
    const colors = [
      {
        "id": 1,
        "name": "cerulean",
        "year": 2000,
        "color": "#98B2D1",
        "pantone_value": "15-4020",
      },
      {
        "id": 2,
        "name": "test",
        "year": 2000,
        "color": "#343535",
        "pantone_value": "33-4020",
        "loaded": "2011-02-005 14:02:13"
      }
    ];

    service.getColorList().then((actualColors) => {
      expect(actualColors).toEqual(colors);
    });

    const req = httpMock.expectOne('http://localhost:3000/colori');
    expect(req.request.method).toEqual("GET");
    req.flush(colors);

    httpMock.verify();
  }));

  it('should getColorList EmptyList', fakeAsync(() => {
    expect(service).toBeTruthy();

    service.getColorList().then((actualColors) => {
      expect(actualColors).toEqual([]);
    });

    const req = httpMock.expectOne('http://localhost:3000/colori');
    expect(req.request.method).toEqual('GET');
    req.flush(null);
    flushMicrotasks();

    httpMock.verify();
  }));

  it('should NOT getColorList', waitForAsync(() => {
    expect(service).toBeTruthy();

    const colors = [];

    const mockErrorResponse = { status: 400, statusText: 'Bad Request' };

    service.getColorList().then((actualColors) => {
      fail("should not get here but did with colors:")
    }, (error) => {
      expect(error).toBeTruthy();
      expect(error.status).toEqual(400);
    });

    const req = httpMock.expectOne('http://localhost:3000/colori');
    expect(req.request.method).toEqual('GET');
    req.flush({}, mockErrorResponse);

    httpMock.verify();
  }));

  it('should getColor', waitForAsync(() => {
    const colors = [
      {
        "id": 1,
        "name": "cerulean",
        "year": 2000,
        "color": "#98B2D1",
        "pantone_value": "15-4020",
        "loaded": "2011-02-005 14:02:13"
      },
      {
        "id": 2,
        "name": "test",
        "year": 2000,
        "color": "#343535",
        "pantone_value": "33-4020",
        "loaded": "2011-02-005 14:02:13"
      }
    ];

    service.getColor(1).then((actualColor) => {
      expect(actualColor).toEqual(colors[0]);
    });

    const req = httpMock.expectOne('http://localhost:3000/colori/1');
    expect(req.request.method).toEqual('GET');
    req.flush(colors[0]);

    httpMock.verify();
  }));

  it('should NOT getColor', waitForAsync(() => {
    expect(service).toBeTruthy();

    const mockErrorResponse = { status: 400, statusText: 'Bad Request' };

    service.getColor(1).then((actualColors) => {
      fail("should not get here but did with colors:")
    }, (error) => {
      expect(error).toBeTruthy();
      expect(error.statusText).toEqual('Bad Request');
    });

    const req = httpMock.expectOne('http://localhost:3000/colori/1');
    expect(req.request.method).toEqual('GET');
    req.flush({}, mockErrorResponse);

    httpMock.verify();
  }));

  it('should addColor', waitForAsync(() => {
    const colors = [
      {
        "id": 1,
        "name": "cerulean",
        "year": 2000,
        "color": "#98B2D1",
        "pantone_value": "15-4020",
        "loaded": "2011-02-005 14:02:13"
      },
      {
        "id": 2,
        "name": "test",
        "year": 2000,
        "color": "#343535",
        "pantone_value": "33-4020",
        "loaded": "2011-02-005 14:02:13"
      }
    ];

    service.addColor(colors[0]).subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:3000/colori');
    expect(req.request.method).toEqual('POST');
    req.flush({id: 1});

    httpMock.verify();
  }));

  it('should NOT addColor', waitForAsync(() => {
    expect(service).toBeTruthy();
    const colors = [
      {
        "id": 1,
        "name": "cerulean",
        "year": 2000,
        "color": "#98B2D1",
        "pantone_value": "15-4020",
        "loaded": "2011-02-005 14:02:13"
      },
      {
        "id": 2,
        "name": "test",
        "year": 2000,
        "color": "#343535",
        "pantone_value": "33-4020",
        "loaded": "2011-02-005 14:02:13"
      }
    ];
    const mockErrorResponse = { status: 400, statusText: 'Bad Request' };

    service.addColor(colors[0]).subscribe((res) => {
      console.log(res);
      fail("Should not have completed");
    }, (error) => {
      expect(error).toBeTruthy();
      expect(error.statusText).toEqual("Bad Request");
    });

    const req = httpMock.expectOne('http://localhost:3000/colori');
    expect(req.request.method).toEqual('POST');
    req.flush({}, mockErrorResponse);

    httpMock.verify();
  }));

  it('should editColor', waitForAsync(() => {
    const colors = [
      {
        "id": 1,
        "name": "cerulean",
        "year": 2000,
        "color": "#98B2D1",
        "pantone_value": "15-4020",
        "loaded": "2011-02-005 14:02:13"
      },
      {
        "id": 2,
        "name": "test",
        "year": 2000,
        "color": "#343535",
        "pantone_value": "33-4020",
        "loaded": "2011-02-005 14:02:13"
      }
    ];

    service.editColor(colors[0]).subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:3000/colori/1');
    expect(req.request.method).toEqual('PUT');
    req.flush(colors[0]);

    httpMock.verify();
  }));

  it('should NOT editColor', waitForAsync(() => {
    expect(service).toBeTruthy();
    const colors = [
      {
        "id": 1,
        "name": "cerulean",
        "year": 2000,
        "color": "#98B2D1",
        "pantone_value": "15-4020",
        "loaded": "2011-02-005 14:02:13"
      },
      {
        "id": 2,
        "name": "test",
        "year": 2000,
        "color": "#343535",
        "pantone_value": "33-4020",
        "loaded": "2011-02-005 14:02:13"
      }
    ];
    const mockErrorResponse = { status: 400, statusText: 'Bad Request' };

    service.editColor(colors[0]).subscribe((res) => {
      console.log(res);
      fail("Should not have completed");
    }, (error) => {
      console.log("Error ", error);
      expect(error).toBeTruthy();
      expect(error.statusText).toEqual("Bad Request");
    });

    const req = httpMock.expectOne('http://localhost:3000/colori/1');
    expect(req.request.method).toEqual('PUT');
    req.flush({}, mockErrorResponse);

    httpMock.verify();
  }));
});
